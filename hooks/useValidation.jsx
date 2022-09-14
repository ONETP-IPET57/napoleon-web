import { useEffect, useState } from 'react';

const useValidation = (str, expression) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log('expression: ', expression, 'str: ', str);
    setIsValid(expression && str ? expression.test(str) : false);
  }, [str, expression]);

  return isValid;
};

export default useValidation;
