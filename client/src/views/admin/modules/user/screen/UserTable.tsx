/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@/components/Table";
import { User } from "@/interface/user";
import { useDispatch } from "react-redux";
import FlexStack from "@/components/FlexStack";
import Modal from "@/components/Modal";
import { setModalState } from "@/service/store/slice/modal.slice";
import tableConfig from "@/config/table.config";
import { useNavigate } from "react-router-dom";
import ImportModal from "@/containers/Modals/ImportModal";
import BatchDeleteModal from "@/containers/Modals/BatchDeleteModal";
import usersApi from "@/service/api/users.api";

const UserTable = () => {
  const { base, name, columns, invalidateKey } = tableConfig.userTable;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalName = `import-${base}-modal`;

  return (
    <section className="px-[32px] py-4">
      <Table>
        {/* Table Header */}
        <Table.Header title="Users" current={`/${tableConfig.userTable.base}`}>
          <FlexStack dir="row">
            <Modal.Button
              title="Import"
              onClick={() => dispatch(setModalState(modalName))}
            />
            <Modal.Button title="Create" onClick={() => navigate(`create`)} />
          </FlexStack>
        </Table.Header>
        <Table.Panel name={name}>
          <Table.Filter
            title="Role"
            name={name}
            columnTitle="role"
            options={[{ title: "User" }, { title: "Admin" }]}
          />

          <Table.MoreOption name={name} />
        </Table.Panel>
        <Table.Content<User> id={name} columns={columns} />
      </Table>

      <ImportModal id={modalName} />
      <BatchDeleteModal
        tableName={name}
        api={usersApi.deleteUserByBatch}
        invalidateKey={invalidateKey}
      />
    </section>
  );
};

export default UserTable;
