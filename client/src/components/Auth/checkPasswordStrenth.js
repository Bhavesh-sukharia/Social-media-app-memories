import { Box, Grid, Typography } from '@material-ui/core';
import { CheckOutlined, ErrorOutlineOutlined } from '@material-ui/icons';
import React from 'react';

const atLeastMinimumLength = (password) => new RegExp(/(?=.{8,})/).test(password);
const atLeastOneUppercaseLetter = (password) => new RegExp(/(?=.*?[A-Z])/).test(password);
const atLeastOneLowercaseLetter = (password) => new RegExp(/(?=.*?[a-z])/).test(password);
const atLeastOneNumber = (password) => new RegExp(/(?=.*?[0-9])/).test(password);
const atLeastOneSpecialChar = (password) => new RegExp(/(?=.*?[#?!@$ %^&*-])/).test(password);

const Strengths = {
  STRONG: 'Strong',
  MEDIUM: 'Medium',
  WEAK: 'Weak',
};

const testingPasswordStrength = (password) => {
  if (!password) return Strengths.WEAK;
  let score = 0;

  if (atLeastMinimumLength(password)) score += 1;
  if (atLeastOneLowercaseLetter(password)) score += 1;
  if (atLeastOneNumber(password)) score += 1;
  if (atLeastOneSpecialChar(password)) score += 1;
  if (atLeastOneUppercaseLetter(password)) score += 1;

  if (score >= 5) return Strengths.STRONG;
  if (score >= 3) return Strengths.MEDIUM;
  return Strengths.WEAK;
};

const getIcon = (passwordStrength) => {
  let icon = ErrorOutlineOutlined;

  switch (passwordStrength) {
    case Strengths.STRONG:
      icon = CheckOutlined;
      break;
    default:
      break;
  }

  return icon;
};

const generateColors = (passwordStrength) => {
  let result = [];

  const COLORS = {
    NEUTRAL: `hsla(0, 0%, 70%, 1)`,
    WEAK: `hsla(353, 100%, 38%, 1)`,
    MEDIUM: `hsla(40, 71%, 51%, 1)`,
    STRONG: `hsla(134, 73%, 30%, 1)`,
  };

  switch (passwordStrength) {
    case Strengths.WEAK:
      result = [COLORS.WEAK, COLORS.NEUTRAL, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
    case Strengths.MEDIUM:
      result = [COLORS.MEDIUM, COLORS.MEDIUM, COLORS.NEUTRAL, COLORS.NEUTRAL];
      break;
    case Strengths.STRONG:
      result = [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
      break;
    default:
      break;
  }

  return result;
};

const PasswordStrength = ({ password }) => {
  const passwordStrength = testingPasswordStrength(password);
  const Icon = getIcon(passwordStrength);
  const colors = generateColors(passwordStrength);

  return (
    password && (
      <>
        <Grid container style={{ padding: '0px 6px' }}>
          {colors.map((color, index) => (
            <Box key={index} flex={1} height='5px' borderRadius='5px' bgcolor={color} margin={0.25}></Box>
          ))}
        </Grid>
        <Grid container style={{ padding: '5px 10px' }}>
          <Icon htmlColor={colors[0]} />
          <Typography style={{ color: colors[0], padding: '0px 5px' }}>{passwordStrength}</Typography>
        </Grid>
        {passwordStrength !== Strengths.STRONG && (
          <>
            <Grid item xs={12} style={{ padding: '0px 40px' }}>
              <p style={{ padding: '0px', margin: '0px', fontWeight: 'bold', color: '#fff' }}>Suggestions:</p>
              <ul style={{ margin: '5px', padding: '0px', color: '#fff' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </Grid>
          </>
        )}
      </>
    )
  );
};

export default PasswordStrength;
