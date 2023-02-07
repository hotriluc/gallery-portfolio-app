import { Color, Vector2Tuple, Vector3Tuple } from 'three';

export interface IGallery {
  w?: number;
  gap?: number;
}

export interface IGalleryItem {
  index: number;
  position: Vector3Tuple;
  scale: Vector2Tuple;
  url: string;
  c?: Color;
}
