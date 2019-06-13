import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    AmbientLight,
    Color,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as cameraConfig from './config/camera.config';
import * as blockConfig from './config/block.config';

class Game {

    constructor(config) {

        const { fov, aspect, near, far } = config;
        this.camera = new PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.z = 12;

        const canvas = document.getElementById('app');
        this.renderer = new WebGLRenderer({ canvas });
        
        this.scene = new Scene();
        this.scene.background = new Color(0xAAAAAA);

        const light = new AmbientLight(0x404040);
        this.scene.add(light);

        this.controls = new OrbitControls(this.camera);

        this.objects = [];

        this.drawBlock(0, 0, 0);
    }

    // Draw a single box
    drawBlock = (x, y, z) =>
    {
        const { blockWidth, blockHeight, blockDepth } = blockConfig;
        const geometry = new BoxGeometry(blockWidth, blockHeight, blockDepth);
        const material = new MeshBasicMaterial({ color: 0x44aa88 });
        const block = new Mesh(geometry, material);

        this.addObjectToScene(block, { x, y, z});
    }

    addObjectToScene = (obj, coords) =>
    {
        obj.position.x = coords.x * blockConfig.blockSpread;
        obj.position.y = coords.y * blockConfig.blockSpread;
        obj.position.z = coords.z * blockConfig.blockSpread;

        this.scene.add(obj);
        this.objects.push(obj);
    }

    // Set the aspect of the camera to the aspect of the canvas's display size
    scaleCameraToCanvas = () =>
    {
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    resizeRendererToDisplay = (renderer) =>
    {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needsResize = canvas.width !== width || canvas.height !== height;
        if (needsResize)
            renderer.setSize(width, height, false);
        return needsResize
    }

    render = () =>
    {
        if (this.resizeRendererToDisplay(this.renderer))
            this.scaleCameraToCanvas();
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