/**
 * Table Component
 *
 * This component renders a table which can be used to display data. It supports custom rendering of cells and an optional loading state.
 *
 * Props:
 * - `columns`: Array of objects defining the table columns. Each object can include keys such as `key`, `header`, `render`, and `width` for customization.
 * - `data`: Array of data objects to be displayed in the table rows.
 * - `loading`: Boolean (optional) - Displays a loading indicator when set to true, useful during data fetching.
 *
 * Features:
 * - Custom cell rendering is supported through a render function specified in the column definition.
 * - A loading indicator can be displayed when the `loading` prop is true and data is not yet available.
 *
 * Styling:
 * - The component is styled using CSS modules, with styles defined in `Table.module.css`.
 *
 * Usage:
 * - Import the `Table` component into your project.
 * - Provide the `columns` and `data` props to define the structure and content of the table.
 * - Optionally, use the `loading` prop to indicate data fetching state with a visual loading indicator.
 */

import { normalizeText } from "@/helpers/normalizeText";
import styles from "./Table.module.css";
import Loader from "../Loader";

export default function Table({ columns, data, loading }) {

  return (
    <div className={styles.container}>
        <table className={styles.table}>
            <thead>
                <tr>
                {
                    // Map over columns to create header cells
                    columns.map((item, index) => <td style={{ width: item.width }} scope="col" key={index}>{item.header || normalizeText(item.key)}</td>)
                }
                </tr>
            </thead>
            <tbody>
                {
                    // Check if loading is true and data is not available
                    loading && !data
                    ? (
                        // Render Loader component in each cell if loading
                        columns.map((_, i) => {
                            return (
                                <td key={i}><Loader /></td>
                            )
                        })
                    )
                    : (data.map((row, index) => {
                        return (
                            <tr className={loading ? styles.loading : ""} key={index}>
                                {
                                    // Map over columns to create cells
                                    columns.map((item, index) => {
                                        return (
                                            <td key={index}>{item?.render ? item.render(row[item.key] ? `${row[item.key]}` : row) : row[item.key]}</td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    }))
                }
            </tbody>
        </table>
    </div>
  )
}
