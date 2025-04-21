// src/problems/reverseString.js
export default {
    id: "reverse-string",
    title: "Reverse a String",
    description:
      "Complete the function so it returns the input string reversed.",
    stubs: {
      java: `public class Main {
    public static String reverseString(String s) {
      // Write your code here
    }
    public static void main(String[] args) {
      System.out.println(reverseString("hello")); // "olleh"
    }
  }`,
      cpp: `#include <iostream>
  #include <string>
  using namespace std;
  
  string reverseString(const string& s) {
    // Write your code here
  }
  
  int main() {
    cout << reverseString("hello") << endl; // "olleh"
    return 0;
  }`,
      python: `def reverse_string(s: str) -> str:
    # Write your code here
  
  if __name__ == "__main__":
    print(reverse_string("hello"))  # "olleh"`,
    },
  };
  