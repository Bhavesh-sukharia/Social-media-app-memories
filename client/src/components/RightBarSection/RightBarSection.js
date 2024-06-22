import React, { useCallback } from 'react';
import { Box, Stack, Typography, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import useStyles from './styles';
import UserAvatar from '../UserProfile/UserAvatar';
import { useSelector } from 'react-redux';

const RightBarSection = React.memo(({ filters, setFilters }) => {
    return (
        <Stack spacing={1}>
            {filters.view === 'primary' ? (
                    <Filter setFilters={setFilters} />
                ) : (
                    <UserSection />
                )
            }
        </Stack>
    );
});

const Filter = React.memo(({ setFilters }) => {
    const classes = useStyles();

    const handleSortChange = useCallback((event) => {
        const newSortBy = event.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: newSortBy,
        }));
    }, [setFilters]);

    return (
        <>
            <Box className={classes.sectionBox}>
                <Typography variant="h6" className={classes.boldText}>
                    Search Filters
                </Typography>
            </Box>
            <Box className={classes.sectionBox}>
                <Typography variant='subtitle1'>
                    Sort by:
                </Typography>
                <RadioGroup defaultValue="Recent" onChange={handleSortChange}>
                    <FormControlLabel
                        value="Recent"
                        control={<Radio color='primary' />}
                        label="Recent"
                        className={classes.radioOption}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="Likes"
                        control={<Radio color='primary' />}
                        label="Likes"
                        className={classes.radioOption}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="Comments"
                        control={<Radio color='primary' />}
                        label="Comments"
                        className={classes.radioOption}
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="Oldest"
                        control={<Radio color='primary' />}
                        label="Oldest"
                        className={classes.radioOption}
                        labelPlacement="start"
                    />
                </RadioGroup>
            </Box>
        </>
    );
});

const UserSection = React.memo(() => {
    const classes = useStyles();
    const { post, isLoading } = useSelector((state) => state.posts);

    if (isLoading || !post) {
        return (
            <Box className={classes.sectionBox}>
                <Typography variant="h6" className={classes.boldText}>
                    Relevant People
                </Typography>
            </Box>
        );
      }
    
    return (
        <>
            <Box className={classes.sectionBox}>
                <Typography variant="h6" className={classes.boldText}>
                    Relevant People
                </Typography>
                <Box display="flex" alignItems="center" mt={2} mb={2}>
                    <UserAvatar width={50} height={50} username={post.creator.username} className={classes.avatar} />
                    <Box ml={2} flexGrow={1}>
                        <Typography variant="body1">{post.creator.name}</Typography>
                        <Typography variant="body2" color="grey">@{post.creator.username}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
});

export default RightBarSection;
