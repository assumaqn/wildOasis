import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useGettingSetting } from "./useGettingSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    setting: {
      breakFastPrice,
      minBookingLength,
      maxBookingLength,
      maxGuestPerBookin,
    } = {},
  } = useGettingSetting();
  const { isUpdating, updateSetting } = useUpdateSetting();
  console.log(isUpdating);
  if (isLoading) <Spinner />;
  function handleBlure(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleBlure(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleBlure(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBookin}
          disabled={isUpdating}
          onBlur={(e) => handleBlure(e, "maxGuestPerBookin")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleBlure(e, "breakFastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
