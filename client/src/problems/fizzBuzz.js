// src/problems/fizzBuzz.js
export default {
    id: "fizzbuzz",
    title: "FizzBuzz",
    description:
      "Print numbers 1–100, but for multiples of 3 print “Fizz”, for 5 print “Buzz”, and for both print “FizzBuzz”.",
    stubs: {
      java: `public class Main {
    public static void fizzBuzz() {
      // Write your code here
    }
    public static void main(String[] args) {
      fizzBuzz();
    }
  }`,
      cpp: `#include <iostream>
  using namespace std;
  
  void fizzBuzz() {
    // Write your code here
  }
  
  int main() {
    fizzBuzz();
    return 0;
  }`,
      python: `def fizz_buzz():
    # Write your code here
  
  if __name__ == "__main__":
    fizz_buzz()`,
    },
  };
  