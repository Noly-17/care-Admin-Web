import { makeStyles } from "@material-ui/core";

const tableWidth = 600

const useStyles = makeStyles((theme) => {

    return {
        table: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },

    }
})



export default useStyles;