/**
 * @param {number[]} nums 
 * @param {number} n 
 * @param {number} start 
 * @param {number} target 
 * @returns {number[][]} res
 */
function helper(nums, n, start, target) {
    const len = nums.length;
    const res = [];
    if (n < 2 || len < n) return res;
    if (n === 2) {
        let i = start, j = len - 1;
        while (i < j) {
            let left = nums[i], right = nums[j];
            const sum = left + right;
            if (sum === target) {
                res.push([left, right]);
                while(i < j && nums[i] === left) i++;
                while(i < j && nums[j] === right) j--;
            } else if (sum > target) {
                while(i < j && nums[j] === right) j--;
            } else {
                while(i < j && nums[i] === left) i++;
            }
        }
    } else {
        for (let i = start; i < len; i++) {
            const subset = helper(nums, n - 1, i + 1, target - nums[i]);
            subset.forEach(s => {
                s.push(nums[i]);
                res.push(s);
            });
            while (i < len - 1 && nums[i] === nums[i + 1]) i++;
        }
    }
    return res;
}

/**
 * @param {number} n
 * @param {number[]} nums 
 * @param {number} target 
 */
function nSum(n, nums, target) {
    // 1. sort
    nums.sort((a, b) => a - b);

    return helper(nums, n, 0, target);
}

const nums1 = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
console.log(nSum(3, nums1, 0));


const nums2 = [1,0,-1,0,-2,2]
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(nSum(4, nums2, 0));

const nums3 = [2,2,2,2,2];
// Output: [[2,2,2,2]]
console.log(nSum(4, nums3, 8));
