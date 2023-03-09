import { useMemo, useState } from 'react'

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config)


    const sortedItems = useMemo(() => {
        if(items) {
            let sortableItems = [...items]
            if(sortConfig !== null) {
                sortableItems.sort((a,b) => {
    /*                if(a[sortConfig.key] < b[setSortConfig.key]) {
                        console.log('ascending - ' + a[sortConfig.key])
                        return sortConfig.direction === 'ascending' ? -1 : 1
                    }
                    if(a[sortConfig.key] > b[setSortConfig.key]) {
                        console.log('descending - ' + b[setSortConfig.key])
                        return sortConfig.direction === 'ascending' ? 1 : -1
                    } */
                    if(a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1
                    }
                    if(a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1
                    }
                    console.log('return 0')
                    return 0
                })
            }
            return sortableItems
        } else {
            return null
        }
    }, [items, sortConfig])

    const requestSort = key => {
        let direction = 'ascending'
        if(sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }
    return { items: sortedItems, requestSort }
}

export default useSortableData