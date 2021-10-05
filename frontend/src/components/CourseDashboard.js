import "../App.css";

const CourseDashboard = ({ match }) => {
  return (
    <div>
      <h1>hello this is {match.params.code}</h1>
    </div>
  );
};

export default CourseDashboard;
