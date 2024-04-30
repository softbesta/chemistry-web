import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import Color from 'color';
import styles from './Chamber.module.scss'

/**
 * Based on maxwell_gen's pdf function from scipy.
 * https://github.com/scipy/scipy/blob/4833a293e7790dd244b2530b74d1a6718cf385d0/scipy/stats/_continuous_distns.py#L5305
 */
const maxwellPDF = function (x: number, mass: number, temp: number) {
  const m = mass / 1000;
  const k = 8.61733262145 * (10 ** (-5));
  const T = temp;
  const a = Math.sqrt(k * T / m);

  return Math.sqrt(2 / Math.PI) * (
    (
      (x ** 2) * Math.exp(-(x ** 2) / (2 * (a ** 2)))
    ) / (a ** 3)
  );
};


interface ChamberFProps {
  width: number,
  height: number,
  isPlaying: boolean,
  allowEscape: boolean,
  escapeSpeed: number,
  activeGases: any[],
  temperature: number,
  // gasProportions: any[],

  count?: number,
  waterLevel?: number,
  gasCounts: number[],
  gasSpeed: number,
}
export const ChamberF = ({
  width,
  height,
  isPlaying,
  allowEscape,
  escapeSpeed,
  activeGases,
  temperature,
  // gasProportions,
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
  const initialParticleCounts = useRef<number[]>([])
  const distributionBuckets = useRef<any[]>([])

  const prevProps = useRef<Partial<ChamberFProps>>()

  // Test purpose
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (!elemRef.current) return

    try {
      console.log('===ChamberF.useEffect 111===')

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

      addParticles()

      let counter1 = 0;
      Matter.Events.on(engine.current, 'afterUpdate', function (e) {
        // console.log('F===Matter.Events.afterUpdate===')
        const _e = e as Matter.IEventTimestamped<Matter.Engine>
        if (_e.timestamp >= counter1 + 200) {
          refreshParticleSpeedDistribution();
          counter1 = _e.timestamp;
        }
      });
    } catch (error) {
      console.error('aaa111', { error })
    }
  }, [])

  /**
   * Adjust each particle's speed to keep the distributions even as
   * they escape.
   */
  const refreshParticleSpeedDistribution = () => {
    particles.current.forEach(function (gasParticles, idx) {
      const gasParticleCount = gasParticles.length;
      const initialCount = initialParticleCounts.current[idx];
      if (initialCount !== gasParticleCount) {
        updateParticleSpeeds(
          gasParticles,
          distributionBuckets.current[idx],
          // gasProportions[idx]
          gasCounts[idx],
        )
      }
    });
  }

  /**
   * Update particle speeds based on the new proportion, and the
   * original distribution bucket.
   */
  const updateParticleSpeeds = (particles: any[], distributionBucket: any[], proportion: any) => {
    let pIdx = 0;
    distributionBucket.forEach(function (bucket) {
      const particlesAtThisSpeed = Math.round(
        bucket.particleCount * (proportion / 100)
      );

      // If there are some particles set to this speed bucket,
      // update the particles array.
      if (particlesAtThisSpeed > 0) {
        let i = 0;
        for (i; i < particlesAtThisSpeed; i++) {
          const idx = pIdx + i;
          if (idx > particles.length) {
            continue;
          }
          const p = particles[pIdx + i];
          if (p) {
            updateParticleSpeed(p, bucket.speed);
          }
        }
        pIdx += particlesAtThisSpeed;
      }
    });

    return particles;
  }

  const updateParticleSpeed = function (p: any, molecularSpeed: any) {
    p.molecularSpeed = molecularSpeed;
  
    const baseSpeed = p.molecularSpeed * gasSpeed;
    let speedMultiplier = baseSpeed / p.speed;
  
    Matter.Body.setVelocity(p, {
      x: p.velocity.x * speedMultiplier,
      y: p.velocity.y * speedMultiplier
    });
  };

  const isParticleAboveEscapeSpeed = function (particle: any, escapeSpeed: any) {
    // Convert matter.js speed back to the meters per second (m/s)
    // unit we're using in the graph.
    let molecularSpeed = particle.speed / gasSpeed;
  
    // If the particle's current speed is 0, that means it hasn't
    // started moving yet. In this case, just use the molecularSpeed
    // we've assigned it on creation.
    if (particle.speed === 0) {
      molecularSpeed = particle.molecularSpeed;
    }
  
    return molecularSpeed >= escapeSpeed;
  };
    
  const makeParticle = (gas: any, molecularSpeed: number) => {
    const particleMargin = margin + 10;
    const particleColor = Color(gas.color);
    // TODO: need to draw pentagon shape here.
    // const p = Matter.Bodies.polygon()
    const p = Matter.Bodies.circle(
      width / 2,          // ** initial position for particles
      height - 50,
      gas.particleSize, {
      render: {
        fillStyle: particleColor.hex(),
        lineWidth: 1
      },
      restitution: 1,
      friction: 0,            // ** control friction
      frictionAir: 0        // ** control air friction
    });

    Matter.Body.setInertia(p, Infinity);
    // p.molecularSpeed = molecularSpeed;

    if (allowEscape &&
      isParticleAboveEscapeSpeed(p, escapeSpeed)
    ) {
      p.collisionFilter.category = 0;
    } else {
      p.collisionFilter.category = 1;
    }

    const direction = Math.random() * Math.PI * 2;
    // p.direction = direction;
    Matter.Body.setVelocity(p, {
      x: Math.sin(direction) * (gasSpeed * molecularSpeed),
      y: Math.cos(direction) * (gasSpeed * -molecularSpeed)
    });

    return p;
  }

  const drawParticles = (activeGases: any[] = [], gasCounts: any[] = [], distributionBuckets: any[]) => {
    const me = this;
    const particles: any[] = [];

    activeGases.forEach(function (gas, idx) {
      const proportion = gasCounts[idx];
      const buckets = distributionBuckets[idx];

      const p: Matter.Body[] = [];

      const particleCount = gasCounts[idx]

      // buckets.forEach(function (bucket: any) {
      for (let i = 0; i < particleCount; i++) {
        p.push(makeParticle(gas, 0.1));
      }
      // });

      particles[idx] = p;
    });

    return particles;
  }

  /**
   * Generate Maxwell PDF distribution buckets for the given gas
   * type.
   *
   * Returns an array of the numbers of particles we want to create
   * at each speed interval.
   */
  const generateBuckets = (gas: any) => {
    const distributionBuckets = [];

    for (let i = 0; i < 2100; i += 20) {
      let particleCount = maxwellPDF(
        i / (460 / 1.5),
        gas.mass,
        temperature);

      particleCount *= 10;
      particleCount = Math.round(particleCount);

      distributionBuckets.push({
        speed: i,
        particleCount: particleCount
      });
    }

    return distributionBuckets;
  }

  useEffect(() => {
    console.log('===ChamberF.useEffect 222===')
    try {
      prevProps.current = { activeGases, temperature, isPlaying, gasCounts }
      removeParticles()
      addParticles()
    } catch (error) {
      console.warn('kkk111', { error })
    }
  }, [gasCounts, activeGases, temperature])

  const removeParticles = () => {
    console.log('===removeParticles===')
    if (particles.current) {
      particles.current.forEach(function (gasParticles) {
        if (!engine.current) return
        Matter.Composite.remove(engine.current.world, gasParticles);
      });
    }
  }
  const addParticles = () => {
    console.log('===addParticles===')
    distributionBuckets.current = [];
    const initialPartCounts: any[] = [];
    activeGases.forEach(function (gas) {
      const buckets = generateBuckets(gas);
      console.log('addParticles 1', { gas, buckets })

      const totalParticles = buckets.reduce(
        function (prev, cur) {
          return prev + cur.particleCount;
        }, 0);

      initialPartCounts.push(totalParticles);
      distributionBuckets.current.push(buckets);
    });

    initialParticleCounts.current = initialPartCounts;
    particles.current = drawParticles(
      activeGases,
      gasCounts,
      distributionBuckets.current
    );

    console.log('addParticles 2', { initialParticleCounts: initialPartCounts })
    console.log('addParticles 3', { activeGases: activeGases, gasCounts, distributionBuckets: distributionBuckets.current })
    console.log('addParticles 4', { particles: particles })

    if (!particles.current) return
    particles.current.forEach(function (gasParticles) {
      if (!engine.current) return
      Matter.Composite.add(engine.current.world, gasParticles);
    });
  }

  const drawWalls = () => {
    const { Bodies, Vertices } = Matter;
    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'red',
        lineWidth: 1
      },
      collisionFilter: {
        // mask: 1
      }
    };

    const cY = height * (1 - waterLevel)

    const rlSpace = 28
    const btSpace = 5

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
    ];
  }

  const handleStart = () => {
    console.log('start button clicked ')
    if (!runner.current || !engine.current) return
    const Runner = Matter.Runner
    Runner.start(runner.current, engine.current)
  }
  const handleStop = () => {
    console.log('start button clicked ')
    if (!runner.current) return
    const Runner = Matter.Runner
    Runner.stop(runner.current)
  }
  const handleEffect = () => {
    const update = counter + 1
    console.log('effect button clicked ', update)
    // setCounter(update)
    addParticles()
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
    >Test Start</button>
    <button
      onClick={handleStop}
      style={{ position: 'absolute', top: 450, left: 80 }}
    >Test Stop</button>
    <button
      onClick={handleEffect}
      style={{ position: 'absolute', top: 450, left: 160 }}
    >Test useEffect</button>
  </div>
}
