export default function NotFoundPage(props) {
  props.history.push({ pathname: "/" });
  return <div>Упс...</div>;
}
