export const exportTasksToCSV = (tasks) => {
  if (!tasks || tasks.length === 0) {
    console.warn("No tasks to export.")
    return
  }

  const csvRows = []

  // Headers
  csvRows.push("Title,Description,Status,Deadline")

  // Rows
  tasks.forEach((task) => {
    const values = [task.title, task.description, task.status, new Date(task.deadline).toLocaleString()]
    csvRows.push(values.join(","))
  })

  const csvString = csvRows.join("\n")

  // Create a download
  const blob = new Blob([csvString], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.setAttribute("href", url)
  a.setAttribute("download", "tasks.csv")
  a.click()
}

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn("No data to export.")
    return
  }

  const csvRows = []

  // Headers
  if (data.length > 0) {
    csvRows.push(Object.keys(data[0]).join(","))
  }

  // Rows
  data.forEach((item) => {
    const values = Object.values(item).map((value) => {
      if (typeof value === "string") {
        return `"${value.replace(/"/g, '""')}"` // Escape double quotes
      }
      return value
    })
    csvRows.push(values.join(","))
  })

  const csvString = csvRows.join("\n")

  // Create a download
  const blob = new Blob([csvString], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.setAttribute("href", url)
  a.setAttribute("download", `${filename}.csv`)
  a.click()
}
