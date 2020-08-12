import { Engine, Scene, UniversalCamera, Vector3, HemisphericLight } from '@babylonjs/core';

let canvas: HTMLCanvasElement;

let engine: Engine;

let scene: Scene;

let camera: UniversalCamera;

let hemisphericLight: HemisphericLight;

let deltaTime: number;

let lastTime: number;

let isPaused = false;

const init = (container: HTMLElement) => {
  canvas = document.createElement('canvas');
  container.appendChild(canvas);

  engine = new Engine(canvas);
  scene = new Scene(engine);
  hemisphericLight = new HemisphericLight('light', new Vector3(-1, 0, 1), scene);
  camera = new UniversalCamera('camera', Vector3.Zero(), scene);

  return scene;
};

const render = () => {
  engine.runRenderLoop(() => { 
    if(!isPaused) {
      if(lastTime) {
        deltaTime = (Date.now() - lastTime) / 1000;
      } else {
        deltaTime = 0;
      }
      
      scene.render();
      
      lastTime = Date.now();
    }
  });
};

const pause = () => {
  isPaused = true;
};

const resume = () => {
  isPaused = false;

  lastTime = Date.now();
};

const getScene = () => scene;

const getCanvas = () => canvas;

const getCamera = () => camera;

const getDeltaTime = () => deltaTime;

export default {
  init,
  render,
  pause,
  resume,
  getScene,
  getCanvas,
  getCamera,
  getDeltaTime,
};