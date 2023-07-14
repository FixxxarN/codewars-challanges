/* 

At a job interview, you are challenged to write an algorithm to check if a given string, s, can be formed from two other strings, part1 and part2.

The restriction is that the characters in part1 and part2 should be in the same order as in s.

The interviewer gives you the following example and tells you to figure out the rest from the given test cases.

For example:

'codewars' is a merge from 'cdw' and 'oears':

    s:  c o d e w a r s   = codewars
part1:  c   d   w         = cdw
part2:    o   e   a r s   = oears


*/

const isMerge = (s, part1, part2) => {
  if ((!s.length && (part1.length || part2.length)) || (part1.length + part2.length) > s.length) return false;
  let part1Index = 0;
  let part2Index = 0;

  let sToBeChecked = '';

  for (let i = 0; i < s.length; i++) {

    if (s[i] === part1[part1Index] && s[i] === part2[part2Index]) {
      if (s[i + 1] === part2[part2Index + 1]) {
        sToBeChecked += part2[part2Index];
        part2Index++;
      }
      else {
        sToBeChecked += part1[part1Index];
        part1Index++;
      }
      continue;
    }
    if (s[i] === part1[part1Index]) {
      sToBeChecked += part1[part1Index];
      part1Index++;
      continue;
    }
    if (s[i] === part2[part2Index]) {
      sToBeChecked += part2[part2Index];
      part2Index++;
      continue;
    }
  }

  return s === sToBeChecked
}

describe('Merged String Checker', () => {
  it('should return true if two strings can merge to a another string', () => {
    const result = isMerge('codewars', 'cdw', 'oears');
    expect(result).toBeTruthy();
  });
  it('should return false if two strings does not match the merge to another string', () => {
    const result = isMerge('More progress', 'More ess', 'pro');
    expect(result).toBeFalsy();
  });
  it('should return true even if there is two of the same characters when checking an index', () => {
    const result = isMerge('xcyc', 'xc', 'cy');
    expect(result).toBeTruthy();
  });
  it('should handle bananas', () => {
    const result = isMerge('Bananas from Bahamas', 'Bahas', 'Bananas from am');
    expect(result).toBeTruthy();
  });
});