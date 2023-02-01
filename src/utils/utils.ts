import * as THREE from 'three';
import { proxy } from 'valtio';

interface ProjectInterface {
  imgUrl: string;
}
interface ProxyInterface {
  clicked: null | number;
  projects: Array<ProjectInterface>;
}

export const damp = THREE.MathUtils.damp;
export const state = proxy<ProxyInterface>({
  clicked: null,
  projects: [
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
    { imgUrl: '/image1.jpg' },
  ],
});
