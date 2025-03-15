export const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      console.warn("No data to export.")
      return
    }
  
    const csvRows = []
  
    // Extract headers from the first object
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(","))
  
    // Rows
    data.forEach((item) => {
      const values = headers.map((header) => {
        let value = item[header]
        if (typeof value === "string") {
          value = value.replace(/"/g, '""') // Escape double quotes
          return `"${value}"` // Quote string values
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
  
  