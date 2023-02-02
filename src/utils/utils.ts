import * as THREE from 'three';
import { proxy } from 'valtio';

export interface ProjectInterface {
  imgUrl: string;
  title?: string;
  description?: string;
  images?: Array<{
    url: string;
    position: { x?: number; y?: number; z?: number };
  }>;
}
interface ProxyInterface {
  clicked: null | number;
  projects: Array<ProjectInterface>;
}

export const damp = THREE.MathUtils.damp;
export const state = proxy<ProxyInterface>({
  clicked: null,
  projects: [
    {
      imgUrl: '/image1.jpg',
      title: 'Project Name 1',
      description: `
        This is project description. If
        you want to change It in the future look in utils.ts file.
        Please feel free to ask me If you ever need help.
    `,
      images: [
        { url: '/image1.jpg', position: { y: 0, z: 0 } },
        { url: '/image1.jpg', position: { y: 0, z: -4 } },
        { url: '/image1.jpg', position: { y: 0, z: 0 } },
        { url: '/image1.jpg', position: { y: 0, z: -4 } },
        { url: '/image1.jpg', position: { y: 0, z: 0 } },
      ],
    },
    {
      imgUrl: '/image1.jpg',
      title: 'Project Name 2',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
    },
    {
      imgUrl: '/image1.jpg',
      title: 'Project Name 3',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
    },
    {
      imgUrl: '/image1.jpg',
      title: 'Project Name 4',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
    },
    {
      imgUrl: '/image1.jpg',
      title: 'Project Name 5',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
    },
  ],
});
