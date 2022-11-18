import styled from "styled-components";

export const StyledFavorites = styled.div`
  width: 100%;
  padding: 32px;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .wrapper-favorites {
    display: flex;
  }
  .favorite-info {
    display: flex;
    gap: 2rem;
    padding-top: 42px;
  }
  p {
    width: 92px;
    height: 16px;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: ${({ theme }) => theme.textColorBase || "#222222"};
  }
  a {
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase};
        }
    }
  /*a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }*/
`;