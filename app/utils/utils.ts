export function getRandomNumbers(arr: string[]): string[] {
    const randomAmount = Math.floor(Math.random() * arr.length) + 1;
    const result = [];
    while (result.length < randomAmount) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      result.push(arr[randomIndex]);
    }

    return Array.from(result);
  }