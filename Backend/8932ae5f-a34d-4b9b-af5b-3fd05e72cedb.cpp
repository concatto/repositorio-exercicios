#include <iostream>

int fatorial(int n) {
  return n <= 1 ? 1 : n * fatorial(n-1);
}

int main() {
  int val;
  std::cin >> val;
  std::cout << fatorial(val);
}