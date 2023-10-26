import $ from 'jquery';
import 'datatables.net';

const initializeDataTables = () => {
  $(document).ready(function() {
    $('#myTable').DataTable();
  });
};

export default initializeDataTables;