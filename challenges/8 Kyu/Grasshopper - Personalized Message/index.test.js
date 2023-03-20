const isUserTheBoss = (user, boss) => user === boss;

const greetUser = (user, boss) => {
  return isUserTheBoss(user, boss) ? 'Hello boss' : 'Hello guest'
}

describe('Grasshopper - Personalized Message', () => {
  describe('The function should take in two parameters', () => {
    it('should return Hello boss if first parameter is equal to the second one.', () => {
      const result = greetUser('Rob', 'Rob');
      expect(result).toEqual('Hello boss');
    });

    it('should return Hello quest if first parameter is not equal to the second one.', () => {
      const result = greetUser('Rob', 'Bob');
      expect(result).toEqual('Hello guest');
    });
  });
});