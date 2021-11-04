import { PulseLoader } from 'react-spinners';

import style from './LoadingComponent.module.css';

interface Props {
  label: string;
}

function LoadingComponent({ label }: Props) {
  return (
    <div className={style.wrapper}>
      <p className={style.label}>{label}</p>
      <PulseLoader color="#2185d0" />
    </div>
  );
}

export default LoadingComponent;
