import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0 1rem;
  height: 100%;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: #EFF6FF;
  color: #3B82F6;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1F2937;
`;

const Description = styled.p`
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ReactCard = ({ title, description, icon, link }) => {
  return (
    <a href={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CardContainer>
        <IconContainer>
          <i data-feather={icon}></i>
        </IconContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContainer>
    </a>
  );
};

export default ReactCard;