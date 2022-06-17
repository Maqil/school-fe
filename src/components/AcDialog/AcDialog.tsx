import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { DialogStyle } from "./AcDialog.style";

const AcDialog = ({ data, open, onClose }) => {
  return (
    <DialogStyle
      open={open}
      onClose={onClose}
      className="ac-dialog"
      maxWidth="lg"
      disableEscapeKeyDown={true}
    >
      <DialogTitle>
        <SentimentVeryDissatisfiedIcon />
        <Typography component="p" variant="h3" className="dialog-title">
          {data.title}
        </Typography>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Typography
          component="p"
          variant="body1"
          className="dialog-text"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></Typography>
        {data.support && (
          <Typography
            component="p"
            variant="body1"
            dangerouslySetInnerHTML={{ __html: data.support }}
          ></Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => data.handleAction()}>
          <span>{data.actionLabel}</span>
        </Button>
        {data.handleSecondaryAction && (
          <Button
            variant="contained"
            onClick={() => data.handleSecondaryAction()}
          >
            ​​​ <span>{data.secondaryActionLabel}</span>
          </Button>
        )}
      </DialogActions>
    </DialogStyle>
  );
};

export default AcDialog;
