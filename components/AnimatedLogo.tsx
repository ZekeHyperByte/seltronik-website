import React from 'react';

interface AnimatedLogoProps {
  interactive?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ interactive = false }) => {
  return (
    <svg
      width="300"
      height="300"
      viewBox="-40 -40 202.89616 172.115814"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      className={interactive ? 'group' : ''}
    >
      <g id="layer1" transform="translate(-43.551913,-102.44211)">
        <g id="g6" transform="translate(4.3151725,-94.71347)">
          <path
            className={
              interactive
                ? 'transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(251,192,45,0.8)]'
                : 'animate-traffic-yellow'
            }
            style={{ fill: '#FBC02D', fillOpacity: 1, strokeWidth: '0.264583' }}
            d="m 75.446096,251.36431 -22.817844,22.81785 c 0,0 14.311878,18.48521 23.553903,9.9368 11.546536,-10.67997 29.810415,-30.17845 29.810415,-30.17845 l 22.81783,-23.18586 19.13756,-19.13755 c -4.04827,-4.41627 -13.57649,-11.43799 -19.13756,-10.67286 -7.06317,0.9718 -16.92936,12.51301 -16.92936,12.51301 l -18.033455,18.76953 z"
            id="path2"
          />
          <path
            className={
              interactive
                ? 'transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]'
                : 'animate-traffic-red'
            }
            style={{ fill: '#EF4444', fillOpacity: 1, strokeWidth: '0.36803' }}
            d="m 47.843865,269.16401 c -6.29254,-5.29767 -8.149351,-8.25462 -8.524869,-13.57575 -0.369676,-5.23835 -0.08399,-5.6439 13.99382,-19.86521 6.51215,-6.57853 17.760283,-17.94744 24.995849,-25.26423 l 13.15558,-13.30325 2.111743,1.6271 c 5.66176,4.3624 9.418952,11.62627 8.722002,16.86247 -0.55001,4.13231 -0.78161,4.4137 -15.021239,18.25111 -7.316528,7.10986 -18.590368,18.33751 -25.052985,24.95032 -6.462618,6.61283 -11.845052,12.05778 -11.960966,12.09991 -0.115917,0.0421 -1.204436,-0.75999 -2.418935,-1.78247 z"
            id="path5"
          />
          <path
            className={
              interactive
                ? 'transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(76,175,80,0.8)]'
                : 'animate-traffic-green'
            }
            style={{ fill: '#4CAF50', fillOpacity: 1, strokeWidth: '0.264583' }}
            d="m 110.40892,289.27137 c 0,0 -12.200246,-10.5198 -12.144978,-17.66543 0.04423,-5.71845 9.936808,-13.98513 9.936808,-13.98513 l 23.92192,-23.92192 19.50558,-20.24165 7.72863,8.09666 c 2.86512,4.45193 3.96279,10.95592 1.10408,16.92937 l -6.62453,6.99256 -22.44982,22.44982 z"
            id="path6"
          />
        </g>
      </g>
    </svg>
  );
};

export default AnimatedLogo;
