import { useAuth } from '@/lib/auth';
import useSWR from 'swr';
import fetcher from "@/utils/fetcher"
import { apifetch } from "@/utils/fetch";
import { CurrentlyReading, MarkAsFinished, SaveForLater } from '@/components/Shelves/Buttons';


const ShelfButtonsContainer = ({ book }) => {

    const { user } = useAuth();
    const { data: shelves, isLoading } = useSWR(user ? `${apifetch}/${user.user_id}/shelves` : null, fetcher)


    if (shelves) {
      if (shelves.currently_reading && shelves.currently_reading.some((shelf) => shelf.id === book.id)) {
        return (
          <>
            <MarkAsFinished book={book}  />
            <SaveForLater book={book} />
            <p>Remove from shelf button to be added</p>
          </>
        ); 
      } if (shelves.previously_read && shelves.previously_read.some((shelf) => shelf.id === book.id)) {
        return <h1>You've read this book</h1>
     } if (shelves.want_to_read && shelves.want_to_read.some((shelf) => shelf.id === book.id)) {
        return (
          <>
            <CurrentlyReading book={book}  />
            <MarkAsFinished book={book} />
            <p>Remove from shelf button to be added</p>
          </>
        );
      } if (shelves.currently_reading) {
          return (
              <>
                <SaveForLater book={book} />
                <CurrentlyReading book={book} />
                <MarkAsFinished book={book} />
              </>
          )
      }
    }

    if (isLoading) {
      return <Spinner />;
    } 
      
    return (
        <>
          <CurrentlyReading book={book} />
          <SaveForLater book={book} />
          <MarkAsFinished book={book} />
        </>
      );
}

//     return (
//       <>
//         <Box my={6}>
//           <ShelfButton
//             book={book}
//             shelf="want_to_read"
//             user={user}
//             icon={RiBookmarkLine}
//             text="Save for later"
//             rounded="full"
//           />
//           <Tooltip
//             label="Set as currently reading"
//             placement="top"
//             hasArrow
//             px={3}
//             py={2}
//             rounded="full"
//           >
//             <IconButton
//               icon={<RiPushpinLine />}
//               mr={4}
//               rounded="full"
//               bg="pink.100"
//             />
//           </Tooltip>
//           <Tooltip label="Set as finished" placement="top">
//             <IconButton
//               icon={<RiCheckDoubleLine />}
//               mr={4}
//               rounded="full"
//               bg="green.100"
//             />
//           </Tooltip>
//         </Box>
//       </>
//     );

// }

export default ShelfButtonsContainer;