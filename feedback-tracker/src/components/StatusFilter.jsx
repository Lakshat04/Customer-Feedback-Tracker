const StatusFilter = ({ setFilter }) => (
    <div>
      <h3>Filter Feedback</h3>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Open">Open</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
  
  export default StatusFilter;
  