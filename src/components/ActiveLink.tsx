import { Link, useRoute } from 'wouter';

const ActiveLink = (props: { href: string; children: string }) => {
  const [isActive] = useRoute(props.href);

  return (
    <Link {...props}>
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  );
};

export default ActiveLink;
