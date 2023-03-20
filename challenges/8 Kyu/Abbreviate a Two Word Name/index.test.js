const getInitialsFromSurnameAndLastName = (name) => name.split(' ').map((name) => name[0]).join('.').toUpperCase();

describe('Abbreviate a Two Word Name', () => {
  it('should return capital initials for a surname and lastname', () => {
    const result = getInitialsFromSurnameAndLastName('André Törnström');
    expect(result).toBe('A.T')
  });
});