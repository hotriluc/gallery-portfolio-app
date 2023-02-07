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
      imgUrl: '/project-1-thumbnail.jpeg',
      title: 'Project_1',
      description: `
        This is project description. If
        you want to change It in the future look in utils.ts file.
        Please feel free to ask me If you ever need help.
    `,
      images: [
        { url: '/project-1-1.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-1-2.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-1-3.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-1-4.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-1-5.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-1-6.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-1-7.jpeg', position: { y: 0, z: 0 } },
      ],
    },
    {
      imgUrl: '/project-2-thumbnail.jpeg',
      title: 'Project_2',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
      images: [
        { url: '/project-2-1.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-2-2.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-2-3.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-2-4.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-2-5.jpeg', position: { y: 0, z: 0 } },
      ],
    },
    {
      imgUrl: '/project-3-thumbnail.jpeg',
      title: 'Project_3',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
      images: [
        { url: '/project-3-1.jpg', position: { y: 0, z: 0 } },
        { url: '/project-3-2.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-3-3.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-3-4.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-3-5.jpeg', position: { y: 0, z: 0 } },
      ],
    },
    {
      imgUrl: '/project-4-thumbnail.jpeg',
      title: 'Project_4',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
      images: [
        { url: '/project-4-1.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-4-2.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-4-3.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-4-4.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-4-5.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-4-6.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-4-7.jpeg', position: { y: 0, z: 0 } },
      ],
    },
    {
      imgUrl: '/project-5-thumbnail.jpeg',
      title: 'Project_5',
      description: `
          This is project description. If
          you want to change It in the future look in utils.ts file.
          Please feel free to ask me If you ever need help.
      `,
      images: [
        { url: '/project-5-1.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-5-2.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-5-3.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-5-4.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-5-5.jpeg', position: { y: 0, z: 0 } },
        { url: '/project-5-6.jpeg', position: { y: 0, z: -4 } },
        { url: '/project-5-7.jpeg', position: { y: 0, z: 0 } },
      ],
    },
  ],
});
