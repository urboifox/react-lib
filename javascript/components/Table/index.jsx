/**
 * Table Component
 *
 * This component renders a table which can be used to display data. It supports custom rendering of cells and optional loading state.
 *
 * Props:
 * - `columns`: Array of objects defining the table columns. Each object can have keys like `key`, `header`, `render`, and `width`.
 * - `data`: Array of data objects to be displayed in the table.
 * - `loading`: Boolean (optional) - If true, displays a loading indicator.
 *
 * Features:
 * - Supports custom cell rendering through a render function in column definition.
 * - Displays a loading indicator when data is being fetched.
 *
 * Styling:
 * - Styled using CSS modules, with styles defined in `Table.module.css`.
 *
 * Usage:
 * - Import the `Table` component and use it in your project.
 * - Pass in the `columns` and `data` props to define the table structure and data.
 * - Optionally, pass in the `loading` prop to display a loading indicator when data is being fetched.
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
