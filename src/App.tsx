import { Image, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas, useThree, Vector3 } from '@react-three/fiber';
import Wrapper from './components/layout/Wrapper';

function Item({
  index,
  position,
  scale,
  ...props
}: {
  index: number;
  position: Vector3;
  scale: Vector3;
}) {
  console.log(index);
  //@ts-ignore
  return <Image position={position} scale={scale} {...props} />;
}

const urls: Array<number> = [1, 2, 3, 4, 5, 6];

function GalleryList({ w = 4, gap = 0.7 }: { w?: number; gap?: number }) {
  const itemSize = w + gap;
  const { width } = useThree((state) => state.viewport);

  return (
    <ScrollControls
      horizontal
      damping={1}
      pages={(width - itemSize + urls.length * itemSize) / width}
      style={{ overflow: 'hidden hidden' }}
    >
      <Scroll>
        {urls.map((url, index) => (
          <Item
            key={index}
            index={index}
            position={[index * itemSize, 0, 0]}
            scale={[w, 4, 1]}
            //@ts-ignore
            url={'/image1.jpg'}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

function App() {
  return (
    <Wrapper>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <GalleryList />
      </Canvas>
    </Wrapper>
  );
}

export default App;
