import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as cameraConfig from './config/camera.config';

class Game {

    constructor(config) {

        const { fov, aspect, near, far } = config;
        this.camera = new PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 2;

        const canvas = document.getElementById('app');
        this.renderer = new WebGLRenderer({ canvas });
        
        this.scene = new Scene();
        this.controls = new OrbitControls(this.camera);
        this.drawCube();
    }

    // Draw a single box
    drawCube = () => {
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material = new MeshBasicMaterial({ color: 0x44aa88 });
        const cube = new Mesh(geometry, material);

        this.scene.add(cube);
    }

    render = () => {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }
}

const game = new Game(cameraConfig);
requestAnimationFrame(game.render);

// Geometry

// Materials and models

// Interactions