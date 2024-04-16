import useEditSetting from '../../hooks/useEditSetting';
import useSettings from '../../hooks/useSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isEditing, editSetting } = useEditSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    editSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum malam/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum malam/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label='Maximum tamu/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestPerBooking}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'maxGuestPerBooking')}
        />
      </FormRow>

      <FormRow label='Harga breakfast'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
