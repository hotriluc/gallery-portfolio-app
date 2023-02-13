import styled from 'styled-components';

export const SectionHeading = styled.h1`
  font-size: 5rem;
`;

export const SectionDescription = styled.p`
  padding-left: 40px;
  font-size: 2rem;
  line-height: 1.2em;
  font-weight: 300;
  color: #bebebe;
`;

export const ExperienceList = styled.ul`
  margin: 0;
  list-style: none;
`;

export const Position = styled.li`
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.2em;

  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const PositionName = styled.p`
  font-weight: 700;
`;
export const OrganizationName = styled.p`
  font-weight: 700;
`;
export const PositionDuration = styled.p`
  color: #bebebe;
  font-size: 1.5rem;
`;

export const ContactList = styled.ul`
  margin: 0;
  list-style: none;

  li {
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.2em;
  }
  li:not(:last-child) {
    margin-bottom: 1rem;
  }

  a {
    color: #bebebe;
    transition: all 0.3s;
  }

  a:hover {
    color: #ffffff;
  }
`;
