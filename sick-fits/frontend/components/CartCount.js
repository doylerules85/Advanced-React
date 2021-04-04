import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background: var(--green);
  color: white;
  border-radius: 30px;
  font-size: 10px;
  padding: 4px;
  margin: 3px;
  font-feature-settings: 'tnum';
`;

const AnimationStyles = styled.span`
  position: relative;
  .count-enter {
    background: var(--green);
    transition: transform 400ms cubic-bezier(0, 1.07, 0.55, 1.01);
    transform: translateY(10px);
  }
  .count-enter-active {
    background: blue;
    position: absolute;
    top: 0;
    transform: translateY(0px);
  }

  .count-exit {
    background: pink;
    transform: translateY(-10px);
    opacity: 0;
  }

  .count-exit-active {
    background: purple;
    transform: translateY(0px);
    opacity: 0;
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="count"
          clasName="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
