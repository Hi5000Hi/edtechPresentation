import React, { useState, useEffect } from "react";
import FormDialog from "./newtask";
import MUIDataTable from "mui-datatables";
import { db } from "./firebase";

export function Tasks(props) {
  const columns = ["Title", "Notes", "Priority"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("tasks").onSnapshot(snapshot => {
      const updated_tasks = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        updated_tasks.push({
          Title: data.title,
          Notes: data.notes,
          Priority: data.priority,
          id: doc.id
        });
      });
      setData(updated_tasks);
    });
    return unsubscribe;
  }, []);

  //[Log] {lookup: {3: true, 4: true}, data: [{index: 1, dataIndex: 3}, {index: 2, dataIndex: 4}]}

  const handleDeleteTask = rowsDeleted => {
    for (const i of rowsDeleted.data) {
      db.collection("tasks")
        .doc(data[i.dataIndex].id)
        .delete();
    }
    console.log(rowsDeleted);
  };

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    onRowsDelete: handleDeleteTask
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
        <MUIDataTable
          title={"Tasks"}
          data={data}
          columns={columns}
          options={options}
        />
        <FormDialog />
      </div>
    </div>
  );
}
