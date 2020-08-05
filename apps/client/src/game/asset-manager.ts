import { AssetsManager, Scene, Mesh, MeshAssetTask } from '@babylonjs/core';

import { getFileExtension } from '../helpers';
import { AssetMap } from './interfaces/asset-map';

let assetLoader: AssetsManager;

let scene: Scene;

let meshes: {[key: string]: Mesh} = {};

let rootUrl = '';

const init = (targetScene: Scene, path = '') => {
  scene = targetScene;
  rootUrl = path;
  assetLoader = new AssetsManager(scene);
};

const load = (assets: AssetMap) => {
  for(let n in assets) {
    const extension = getFileExtension(assets[n]);
    let task;

    switch(extension) {
      case 'babylon':
        task = assetLoader.addMeshTask(n, '', rootUrl, assets[n]);
        break;
    }
  }

  return new Promise((resolve, reject) => {
    assetLoader.onFinish = (tasks) => {
      tasks.forEach(task => {
        if(task instanceof MeshAssetTask) {
          task.loadedMeshes.forEach((mesh: Mesh) => {
            mesh.isVisible = false;
            
            meshes[mesh.name] = mesh;
          });
        }
      })
      
      resolve(tasks);
    };

    assetLoader.load();
  });
};

const cloneMesh = (name: string) => {
  const original = meshes[name] as Mesh;

  if(!original) {
    console.warn(`Mesh ${name} does not exist.`);
    return;
  }

  const clone = original.clone(name);

  clone.isVisible = true;

  if(original.skeleton) {
    clone.skeleton = original.skeleton.clone(original.skeleton.name);
  }

  return clone;
};

export default {
  init,
  load,
  cloneMesh,
}