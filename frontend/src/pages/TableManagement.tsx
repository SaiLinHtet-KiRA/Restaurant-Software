import SafeAreaViewLayout from "@/components/layout/SafeAreaView";
import StackLayout from "@/components/layout/StackLayout";
import Container from "@/components/layout/Container";
import Spinner from "@/components/Buget/Spinner";
import EmptyState from "@/components/Buget/EmptyState";
import Button from "@/components/Button/Button";
import TableCard from "@/components/Card/TableCard";
import PlusCirlce from "@/svg/PlusCircle";
import Table from "@/svg/Table";
import {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTablesQuery,
} from "@/redux/api/table";

export default function TableManagement() {
  const { data, isFetching } = useGetTablesQuery({ taken: false });
  const [create] = useCreateTableMutation();
  const [Remove] = useDeleteTableMutation();

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
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="page-title text-white">Tables</span>
              <span className="page-subtitle text-white/70">
                {data?.size || 0} table{data?.size === 1 ? "" : "s"}
              </span>
            </div>
            <Button
              SVG={PlusCirlce}
              text={"Add Table"}
              onClik={onClick}
              disabled={isFetching}
            />
          </div>
          {isFetching ? (
            <Spinner className="text-white" />
          ) : data?.size ? (
            <div className="table-grid w-full">
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
          ) : (
            <EmptyState
              SVG={Table}
              text="There are no tables yet"
              subtitle="Tap Add Table above to create one."
              className="text-white/90"
            />
          )}
        </Container>
      </StackLayout>
    </SafeAreaViewLayout>
  );
}
