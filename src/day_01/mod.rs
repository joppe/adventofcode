use crate::common;

fn part1(numbers: &Vec<i32>) -> i32 {
    let sum = 2020;

    for (i, a) in numbers.iter().enumerate() {
        for (j, b) in numbers.iter().enumerate() {
            if i != j && a + b == sum {
                return a * b;
            }
        }
    }

    return 0
}

fn part2(numbers: &Vec<i32>) -> i32 {
    let sum = 2020;

    for (i, a) in numbers.iter().enumerate() {
        for (j, b) in numbers.iter().enumerate() {
            for (k, c) in numbers.iter().enumerate() {
                if i != j && j != k && a + b + c == sum {
                    return a * b * c;
                }
            }
        }
    }

    return 0
}

pub fn main(is_test_mode: bool) {
    let filename = common::get_filename(&"day_01".to_string(), is_test_mode);
    let numbers = common::get_numbers(&filename.to_string());

    println!("Part1 result: {}", part1(&numbers));
    println!("Part2 result: {}", part2(&numbers));
}
