import { Button, Input, Stack, Typography } from '@mui/joy';


const NewTripPage = () => {
  return (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <Typography level="h1">New Trip</Typography>
      <Stack
        bgcolor="#f9e1d6"
        width={800}
        height={500}
        justifyContent="center"
        alignItems="center"
        gap={3}
        border="solid 3px #f98568"
        borderRadius={15}
      >
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography level="body-lg" fontWeight="bold">Location</Typography>
          <Input sx={{
            width: "100%",
          }}/>
        </Stack>
        <Stack direction="row" justifyContent="space-between" width="50%">
          <Stack gap={1}>
            <Typography level="body-lg" fontWeight="bold">From</Typography>
            <Input type="date"/>
          </Stack>
          <Stack gap={1}>
            <Typography level="body-lg" fontWeight="bold">To</Typography>
            <Input type="date"/>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" width="50%">
          <Typography level="body-lg" fontWeight="bold">Picture</Typography>
          <Input
            type="file"
            sx={{ width: "100%", alignItems: "center" }}
          />
        </Stack>
        <Button sx={{ width: "50%" }} color="warning" variant="solid">Plan Trip!</Button>
      </Stack>
    </Stack>
  );
}

export default NewTripPage;