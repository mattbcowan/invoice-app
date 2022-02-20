import { useWatch } from "react-hook-form";
import styled from "styled-components";
import Currency from "../Currency";

const totalCal = (results) => {
  let totalValue = 0;

  totalValue = results.reduce((a, b) => a * b);

  return totalValue;
};

export const LineItemTotal = ({ control, index, setValue, ...props }) => {
  const results = useWatch({
    control,
    name: [`line_items.${index}.quantity`, `line_items.${index}.price`],
  });
  const output = totalCal(results);
  setValue(`line_items.${index}.total`, output);

  return (
    <Wrapper
      mobileGridCol={props.obileGridCol}
      desktopGridCol={props.desktopGridCol}
    >
      <StyledLabel>Total</StyledLabel>
      <Total>
        {output ? <Currency value={output} /> : <Currency value={0} />}
      </Total>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: ${(props) => props.mobileGridCol};

  @media (min-width: 480px) {
    grid-column: ${(props) => props.desktopGridCol};
  }
`;

const StyledLabel = styled.label`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #7e88c3;
  margin-bottom: 0.3em;
`;

const Total = styled.div`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.25px;
  color: #888eb0;
  font-weight: 700;
  margin-top: 1.5em;
`;
