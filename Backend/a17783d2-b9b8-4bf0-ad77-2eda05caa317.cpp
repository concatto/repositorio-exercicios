#include <iostream>

int fatorial(n) {
  return n <= 1 ? 1 : n * fatorial(n - 1);
}

int main() {
  int n;
  std::cin >> n;

  std::cout << fatorial(n);
}