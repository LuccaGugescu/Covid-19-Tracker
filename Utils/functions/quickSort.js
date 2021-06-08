import partition from "./partition"

function quickSort(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}

export default quickSort;