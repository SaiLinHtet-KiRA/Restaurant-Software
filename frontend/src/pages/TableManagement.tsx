import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import Spinner from "@/components/Buget/Spinner";
import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import PlusCirlce from "@/svg/PlusCircle";
import useGetTheme from "@/constants/useGetTheme";
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTablesQuery,
} from "@/redux/api/table";

export default function TableManagement() {
  const { data, isFetching } = useGetTablesQuery({ taken: false });
  const [create] = useCreateTableMutation();
  const [Remove] = useDeleteTableMutation();
  const { space, numColumns } = useGetTheme();

  const onClick = async () => {
    try {
      await create().unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaViewLayout>
      <StackLayout>
        <Container>
          <div className="md:px-10 flex flex-row justify-between items-center">
            <span className="font-bold text-2xl md:text-4xl text-white">
              Table({data?.size || "0"})
            </span>
            <Button
              SVG={PlusCirlce}
              text={"Add Table"}
              onClik={onClick}
              disabled={isFetching}
            />
          </div>
          {isFetching ? (
            <Spinner />
          ) : data?.size ? (
            <div className="self-center">
              <div
                className="grid"
                style={{
                  gap: space,
                  gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
                }}
              >
                {data.data.map(({ number, _id }) => (
                  <TableCard
                    key={_id}
                    number={number}
                    onClick={
                      number == data?.data.length
                        ? () => {
                            try {
                              Remove(_id).unwrap();
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 justify-center items-center">
              <span className="text-white text-xl font-bold">
                There is no tables!!!
              </span>
            </div>
          )}
        </Container>
      </StackLayout>
    </SafeAreaViewLayout>
  );
}
