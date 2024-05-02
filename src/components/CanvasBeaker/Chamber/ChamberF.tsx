import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import Color from 'color';
import styles from './Chamber.module.scss'
import { getRandom } from '../../../helper/functions';

const log_ChamberF = false

interface ChamberFProps {
  width: number,
  height: number,
  allowEscape: boolean,
  escapeSpeed: number,
  activeGases: any[],

  waterLevel?: number,
  gasCounts: number[],
  gasSpeed: number,
}
export const ChamberF = ({
  width,
  height,
  allowEscape,
  escapeSpeed,
  activeGases,
  waterLevel = 0.4,
  gasCounts,
  gasSpeed,
}: ChamberFProps) => {

  const margin = 100

  const elemRef = useRef<HTMLDivElement>(null)
  const render = useRef<Matter.Render>()
  const engine = useRef<Matter.Engine>()
  const runner = useRef<Matter.Runner>()

  const particles = useRef<any[]>([])
  const particleCounts = useRef<number[]>(gasCounts)
  const gasSpeedRef = useRef<number>(gasSpeed / 50)

  useEffect(() => {
    gasSpeedRef.current = gasSpeed / 50
  }, [gasSpeed])

  /**
   * Adjust each particle's speed to keep the distributions even as
   * they escape.
   */
  const refreshParticleSpeedDistribution = () => {
    particles.current.forEach(function (gasParticles, idx) {
      // if (initialCount !== gasParticleCount) {
      updateParticleSpeeds(
        gasParticles,
        particleCounts.current[idx],
      )
      // }
    });
  }

  /**
   * Update particle speeds based on the new proportion, and the
   * original distribution bucket.
   */
  const updateParticleSpeeds = (particles: any[], gasCount: any) => {

    let pIdx = 0
    if (gasCount > 0) {
      let i = 0
      for (i; i < gasCount; i++) {
        const idx = pIdx + i
        if (idx > particles.length) {
          break
        }
        const p = particles[pIdx + i]
        if (p) {
          updateParticleSpeed(p, 21)
        }
      }
    }
  }

  const updateParticleSpeed = function (p: any, molecularSpeed: any) {
    p.molecularSpeed = molecularSpeed;

    const baseSpeed = p.molecularSpeed * gasSpeedRef.current;
    let speedMultiplier = baseSpeed / p.speed;

    Matter.Body.setVelocity(p, {
      x: p.velocity.x * speedMultiplier,
      y: p.velocity.y * speedMultiplier
    });
  };

  const isParticleAboveEscapeSpeed = function (particle: any, escapeSpeed: any) {
    // Convert matter.js speed back to the meters per second (m/s)
    // unit we're using in the graph.
    let molecularSpeed = particle.speed / gasSpeedRef.current;

    // If the particle's current speed is 0, that means it hasn't
    // started moving yet. In this case, just use the molecularSpeed
    // we've assigned it on creation.
    if (particle.speed === 0) {
      molecularSpeed = particle.molecularSpeed;
    }

    return molecularSpeed >= escapeSpeed;
  };

  const makeParticle = (gas: any, molecularSpeed: number, isDroppedElem: boolean = false) => {
    const particleColor = Color(gas.color);

    let wx = getRandom(20, width - 20)
    let wy = getRandom(height * (1 - waterLevel) + 20, height - 20)
    if (isDroppedElem) {
      wx = width / 2
      wy = height * (1 - waterLevel)
    }

    const angle = getRandom(0.2, 0.8) * Math.PI
    const direct = Math.round(Math.random()) === 0 ? -1 : 1
    const dx = Math.sin(angle) * direct
    const dy = Math.cos(angle) * direct

    let p
    if (gas.particleType === 'pentagon') {
      p = Matter.Bodies.polygon(
        wx,                     // ** initial position for particles
        wy,
        5,
        gas.particleSize,
        {
          render: {
            fillStyle: particleColor.hex(),
            lineWidth: 1
          },
          restitution: 1,
          friction: 0,          // ** control friction
          frictionAir: 0        // ** control air friction
        }
      )
    } else {
      p = Matter.Bodies.circle(
        wx,                     // ** initial position for particles
        wy,
        gas.particleSize,
        {
          render: {
            fillStyle: particleColor.hex(),
            lineWidth: 1
          },
          restitution: 1,
          friction: 0,          // ** control friction
          frictionAir: 0        // ** control air friction
        }
      )
    }

    Matter.Body.setInertia(p, Infinity);

    if (allowEscape &&
      isParticleAboveEscapeSpeed(p, escapeSpeed)
    ) {
      p.collisionFilter.category = 0;
    } else {
      p.collisionFilter.category = 1;
    }

    const direction = Math.random() * Math.PI * 2;
    // p.direction = direction;
    // const update111 = {
    //   x: Math.sin(direction) * (gasSpeedRef.current * molecularSpeed),
    //   y: Math.cos(direction) * (gasSpeedRef.current * -molecularSpeed)
    // }

    // log_ChamberF && console.log('qqq 111', { p, gasSpeedRef.current, molecularSpeed, update111 })

    // const baseSpeed = molecularSpeed * gasSpeedRef.current;
    // let speedMultiplier = baseSpeed / p.speed;
    // const update222 = {
    //   x: p.velocity.x * speedMultiplier,
    //   y: p.velocity.y * speedMultiplier
    // }
    // log_ChamberF && console.log('qqq 222', { p, gasSpeedRef.current, molecularSpeed, update222 })


    Matter.Body.setVelocity(p, {
      x: Math.sin(direction) * (gasSpeedRef.current * molecularSpeed),
      y: Math.cos(direction) * (gasSpeedRef.current * -molecularSpeed)
    });

    return p;
  }

  const drawParticles = (activeGases: any[] = [], gasCounts: any[] = []) => {
    const particles: any[] = [];

    activeGases.forEach(function (gas, idx) {

      const p: Matter.Body[] = [];

      const particleCount = gasCounts[idx]

      // buckets.forEach(function (bucket: any) {
      for (let i = 0; i < particleCount; i++) {
        p.push(makeParticle(gas, 21));
      }
      // });

      particles[idx] = p;
    });

    return particles;
  }

  useEffect(() => {
    if (!elemRef.current) return

    try {
      // log_ChamberF && console.log('===ChamberF.useEffect 111===')

      const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite;

      // create an engine
      engine.current = Engine.create()
      engine.current.gravity.y = 0;

      if (render.current) {
        return
      }
      // create a renderer
      render.current = Render.create({
        element: elemRef.current,
        engine: engine.current,
        options: {
          width: width,
          height: height,
          wireframes: false,
          background: 'transparent',
        }
      });
      if (!render.current) return

      const walls = drawWalls();
      Composite.add(engine.current.world, walls);

      // Render.lookAt(render.current, {
      //   min: { x: 0, y: 0 },
      //   max: { x: width, y: height }
      // });

      render.current.canvas.style.background = 'transparent'
      // run the renderer
      Render.run(render.current)

      runner.current = Runner.create();

      removeParticles()
      addParticles()

      let counter1 = 0;
      Matter.Events.on(engine.current, 'afterUpdate', function (e) {
        // log_ChamberF && console.log('F===Matter.Events.afterUpdate===')
        const _e = e as Matter.IEventTimestamped<Matter.Engine>
        if (_e.timestamp >= counter1 + 200) {
          refreshParticleSpeedDistribution();
          counter1 = _e.timestamp;
        }
      });
      Runner.start(runner.current, engine.current)
    } catch (error) {
      console.error('aaa111', { error })
    }
  }, [])

  useEffect(() => {
    // log_ChamberF && console.log('===ChamberF.useEffect 222===')
    try {
      particleCounts.current = gasCounts

      log_ChamberF && console.log({ gasCounts: particleCounts.current })
      for (let gasType = 0; gasType < particles.current.length; gasType++) {
        const diffCount = particleCounts.current[gasType] - particles.current[gasType].length
        if (diffCount > 0) {
          f_addParticle(gasType, diffCount)
        } else if (diffCount < 0) {
          f_removeParticle(gasType, diffCount)
        }
      }
    } catch (error) {
      console.warn('fail', { error })
    }
  }, [gasCounts])

  const removeParticles = () => {
    log_ChamberF && console.log('===removeParticles===')
    if (particles.current) {
      particles.current.forEach(function (gasParticles) {
        if (!engine.current) return
        Matter.Composite.remove(engine.current.world, gasParticles);
      });
    }
  }
  const addParticles = () => {
    log_ChamberF && console.log('===addParticles===')

    particles.current = drawParticles(
      activeGases,
      gasCounts,
    );

    if (!particles.current) return
    particles.current.forEach(function (gasParticles) {
      if (!engine.current) return
      Matter.Composite.add(engine.current.world, gasParticles);
    });
  }

  const f_addParticle = (gasType: number, addCount: number) => {
    log_ChamberF && console.log('===f_addParticle===', { gasType, addCount })
    const activeGas = activeGases[gasType]
    const newGases: Matter.Body[] = []
    for (let c = 0; c < addCount; c++) {
      const newGas = makeParticle(activeGas, 21, true)
      newGases.push(newGas)
    }
    const gasParticles = particles.current[gasType]
    particles.current[gasType] = [...gasParticles, ...newGases]
    log_ChamberF && console.log({ updatedParticles: particles.current[gasType] })
    if (!engine.current) return
    Matter.Composite.add(engine.current.world, newGases)
  }

  const f_removeParticle = (gasType: number, removeCount: number) => {
    log_ChamberF && console.log('===f_removeParticle===', { gasType, removeCount })
    if (!particles.current || !particles.current[gasType]) return
    const removeParticle = particles.current[gasType].splice(-removeCount)
    log_ChamberF && console.log({ updatedParticles: particles.current[gasType] })
    if (!engine.current) return
    Matter.Composite.remove(engine.current.world, removeParticle)
  }

  const drawWalls = () => {
    const { Bodies, Vertices } = Matter;

    // const vertices = [
    //   { x: 10, y: 123 },
    //   { x: 120, y: 100 },
    //   { x: 130, y: 100 },
    //   { x: 140, y: 130 },
    // ]

    const wallColor = 'transparent'
    const cornerColor = 'transparent'

    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: wallColor,
        lineWidth: 1
      },
      collisionFilter: {
        // mask: 1
      },
      friction: 0,
    };

    const cY = height * (1 - waterLevel)

    const rlSpace = 28 // offset x
    const btSpace = 5  // offset y

    return [
      // TOP wall
      Bodies.rectangle(
        // x, y
        width / 2, cY - margin / 2,
        // width, height
        width + 33, margin + btSpace,
        wallOptions,
      ),
      // BOTTOM wall
      Bodies.rectangle(
        // x, y
        width / 2, height + margin / 2,
        // width, height
        width + 33, margin + btSpace,
        wallOptions,
      ),
      // LEFT wall
      Bodies.rectangle(
        // x, y
        0 - margin / 2, height / 2 + margin,
        // width, height
        margin + rlSpace, height + margin * 2,
        wallOptions,
      ),
      // RIGHT wall
      Bodies.rectangle(
        // x, y
        width + margin / 2, height / 2 + margin,
        // width, height
        margin + rlSpace, height + margin * 2,
        wallOptions,
      ),

      // Bodies.fromVertices(100, 100, [vertices], {
      //   isStatic: true,
      //   render: {
      //     fillStyle: '#ff0000',
      //     strokeStyle: '#00ff00'
      //   }
      // })

      // Left-Top Corner 
      Bodies.rectangle(
        rlSpace / 2,
        cY,
        15, 15,
        {
          isStatic: true,
          render: {
            fillStyle: 'transparent',
            strokeStyle: cornerColor,
            lineWidth: 1,
          },
          friction: 0,
          angle: Math.PI * 0.25,
        }
      ),
      // Right-Top Corner 
      Bodies.rectangle(
        width - rlSpace / 2,
        cY,
        15, 15,
        {
          isStatic: true,
          render: {
            fillStyle: 'transparent',
            strokeStyle: cornerColor,
            lineWidth: 1,
          },
          friction: 0,
          angle: Math.PI * 0.25,
        }
      ),
      // Left-Bottom Corner 
      Bodies.rectangle(
        rlSpace / 2,
        height,
        25, 25,
        {
          isStatic: true,
          render: {
            fillStyle: 'transparent',
            strokeStyle: cornerColor,
            lineWidth: 1,
          },
          friction: 0,
          angle: Math.PI * 0.25,
        }
      ),
      // Right-Bottom Corner 
      Bodies.rectangle(
        width - rlSpace / 2,
        height,
        25, 25,
        {
          isStatic: true,
          render: {
            fillStyle: 'transparent',
            strokeStyle: cornerColor,
            lineWidth: 1,
          },
          friction: 0,
          angle: Math.PI * 0.25,
        }
      ),

    ];
  }

  const handleStart = () => {
    log_ChamberF && console.log('start button clicked ')
    // if (!runner.current || !engine.current) return
    // const Runner = Matter.Runner
    // Runner.start(runner.current, engine.current)

    gasSpeedRef.current = 0.1
    log_ChamberF && console.log(particles.current)
    log_ChamberF && console.log(particleCounts.current)
  }
  const handleStop = () => {
    log_ChamberF && console.log('start button clicked ')
    // if (!runner.current) return
    // const Runner = Matter.Runner
    // Runner.stop(runner.current)

    f_removeParticle(1, 2)
    log_ChamberF && console.log(particles.current)
  }
  const handleEffect = () => {
    log_ChamberF && console.log('effect button clicked ')

    f_addParticle(1, 3)
    log_ChamberF && console.log(particles.current)
  }

  return <div className={styles.chamberContainer}>
    <div
      id='ChamberPixiView'
      ref={elemRef}
      style={{ position: 'absolute', top: 0 }}
    />
    <button
      onClick={handleStart}
      style={{ position: 'absolute', top: 450 }}
    >Chamber 111</button>
    <button
      onClick={handleStop}
      style={{ position: 'absolute', top: 450, left: 80 }}
    >Chamber 222</button>
    <button
      onClick={handleEffect}
      style={{ position: 'absolute', top: 450, left: 160 }}
    >Chamber 333</button>
  </div>
}
