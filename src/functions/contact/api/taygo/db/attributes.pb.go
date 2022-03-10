// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.19.1
// source: taygo/db/attributes.proto

package db

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	anypb "google.golang.org/protobuf/types/known/anypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Attributes struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Optional  bool                `protobuf:"varint,1,opt,name=optional,proto3" json:"optional,omitempty"`
	Unique    bool                `protobuf:"varint,2,opt,name=unique,proto3" json:"unique,omitempty"`
	Id        bool                `protobuf:"varint,3,opt,name=id,proto3" json:"id,omitempty"`
	UpdatedAt bool                `protobuf:"varint,4,opt,name=updatedAt,proto3" json:"updatedAt,omitempty"`
	Default   *AttributesDefault  `protobuf:"bytes,5,opt,name=default,proto3" json:"default,omitempty"`
	Relation  *AttributesRelation `protobuf:"bytes,6,opt,name=relation,proto3" json:"relation,omitempty"`
}

func (x *Attributes) Reset() {
	*x = Attributes{}
	if protoimpl.UnsafeEnabled {
		mi := &file_taygo_db_attributes_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Attributes) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Attributes) ProtoMessage() {}

func (x *Attributes) ProtoReflect() protoreflect.Message {
	mi := &file_taygo_db_attributes_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Attributes.ProtoReflect.Descriptor instead.
func (*Attributes) Descriptor() ([]byte, []int) {
	return file_taygo_db_attributes_proto_rawDescGZIP(), []int{0}
}

func (x *Attributes) GetOptional() bool {
	if x != nil {
		return x.Optional
	}
	return false
}

func (x *Attributes) GetUnique() bool {
	if x != nil {
		return x.Unique
	}
	return false
}

func (x *Attributes) GetId() bool {
	if x != nil {
		return x.Id
	}
	return false
}

func (x *Attributes) GetUpdatedAt() bool {
	if x != nil {
		return x.UpdatedAt
	}
	return false
}

func (x *Attributes) GetDefault() *AttributesDefault {
	if x != nil {
		return x.Default
	}
	return nil
}

func (x *Attributes) GetRelation() *AttributesRelation {
	if x != nil {
		return x.Relation
	}
	return nil
}

type AttributesDefault struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Value         *anypb.Any `protobuf:"bytes,5,opt,name=value,proto3" json:"value,omitempty"`
	Autoincrement bool       `protobuf:"varint,6,opt,name=autoincrement,proto3" json:"autoincrement,omitempty"`
	Dbgenerated   bool       `protobuf:"varint,7,opt,name=dbgenerated,proto3" json:"dbgenerated,omitempty"`
	Cuid          bool       `protobuf:"varint,8,opt,name=cuid,proto3" json:"cuid,omitempty"`
	Uuid          bool       `protobuf:"varint,9,opt,name=uuid,proto3" json:"uuid,omitempty"`
	Now           bool       `protobuf:"varint,10,opt,name=now,proto3" json:"now,omitempty"`
}

func (x *AttributesDefault) Reset() {
	*x = AttributesDefault{}
	if protoimpl.UnsafeEnabled {
		mi := &file_taygo_db_attributes_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AttributesDefault) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AttributesDefault) ProtoMessage() {}

func (x *AttributesDefault) ProtoReflect() protoreflect.Message {
	mi := &file_taygo_db_attributes_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AttributesDefault.ProtoReflect.Descriptor instead.
func (*AttributesDefault) Descriptor() ([]byte, []int) {
	return file_taygo_db_attributes_proto_rawDescGZIP(), []int{1}
}

func (x *AttributesDefault) GetValue() *anypb.Any {
	if x != nil {
		return x.Value
	}
	return nil
}

func (x *AttributesDefault) GetAutoincrement() bool {
	if x != nil {
		return x.Autoincrement
	}
	return false
}

func (x *AttributesDefault) GetDbgenerated() bool {
	if x != nil {
		return x.Dbgenerated
	}
	return false
}

func (x *AttributesDefault) GetCuid() bool {
	if x != nil {
		return x.Cuid
	}
	return false
}

func (x *AttributesDefault) GetUuid() bool {
	if x != nil {
		return x.Uuid
	}
	return false
}

func (x *AttributesDefault) GetNow() bool {
	if x != nil {
		return x.Now
	}
	return false
}

type AttributesRelation struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name       string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Fields     []string `protobuf:"bytes,2,rep,name=fields,proto3" json:"fields,omitempty"`
	References []string `protobuf:"bytes,3,rep,name=references,proto3" json:"references,omitempty"`
}

func (x *AttributesRelation) Reset() {
	*x = AttributesRelation{}
	if protoimpl.UnsafeEnabled {
		mi := &file_taygo_db_attributes_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AttributesRelation) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AttributesRelation) ProtoMessage() {}

func (x *AttributesRelation) ProtoReflect() protoreflect.Message {
	mi := &file_taygo_db_attributes_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AttributesRelation.ProtoReflect.Descriptor instead.
func (*AttributesRelation) Descriptor() ([]byte, []int) {
	return file_taygo_db_attributes_proto_rawDescGZIP(), []int{2}
}

func (x *AttributesRelation) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *AttributesRelation) GetFields() []string {
	if x != nil {
		return x.Fields
	}
	return nil
}

func (x *AttributesRelation) GetReferences() []string {
	if x != nil {
		return x.References
	}
	return nil
}

var File_taygo_db_attributes_proto protoreflect.FileDescriptor

var file_taygo_db_attributes_proto_rawDesc = []byte{
	0x0a, 0x19, 0x74, 0x61, 0x79, 0x67, 0x6f, 0x2f, 0x64, 0x62, 0x2f, 0x61, 0x74, 0x74, 0x72, 0x69,
	0x62, 0x75, 0x74, 0x65, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x08, 0x74, 0x61, 0x79,
	0x67, 0x6f, 0x2e, 0x64, 0x62, 0x1a, 0x19, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x61, 0x6e, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0xdf, 0x01, 0x0a, 0x0a, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x12,
	0x1a, 0x0a, 0x08, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x61, 0x6c, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x08, 0x52, 0x08, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x61, 0x6c, 0x12, 0x16, 0x0a, 0x06, 0x75,
	0x6e, 0x69, 0x71, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06, 0x75, 0x6e, 0x69,
	0x71, 0x75, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28, 0x08, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x1c, 0x0a, 0x09, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74,
	0x18, 0x04, 0x20, 0x01, 0x28, 0x08, 0x52, 0x09, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64, 0x41,
	0x74, 0x12, 0x35, 0x0a, 0x07, 0x64, 0x65, 0x66, 0x61, 0x75, 0x6c, 0x74, 0x18, 0x05, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x74, 0x61, 0x79, 0x67, 0x6f, 0x2e, 0x64, 0x62, 0x2e, 0x41, 0x74,
	0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x44, 0x65, 0x66, 0x61, 0x75, 0x6c, 0x74, 0x52,
	0x07, 0x64, 0x65, 0x66, 0x61, 0x75, 0x6c, 0x74, 0x12, 0x38, 0x0a, 0x08, 0x72, 0x65, 0x6c, 0x61,
	0x74, 0x69, 0x6f, 0x6e, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x74, 0x61, 0x79,
	0x67, 0x6f, 0x2e, 0x64, 0x62, 0x2e, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73,
	0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x08, 0x72, 0x65, 0x6c, 0x61, 0x74, 0x69,
	0x6f, 0x6e, 0x22, 0xc1, 0x01, 0x0a, 0x11, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65,
	0x73, 0x44, 0x65, 0x66, 0x61, 0x75, 0x6c, 0x74, 0x12, 0x2a, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x41, 0x6e, 0x79, 0x52, 0x05, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x12, 0x24, 0x0a, 0x0d, 0x61, 0x75, 0x74, 0x6f, 0x69, 0x6e, 0x63, 0x72,
	0x65, 0x6d, 0x65, 0x6e, 0x74, 0x18, 0x06, 0x20, 0x01, 0x28, 0x08, 0x52, 0x0d, 0x61, 0x75, 0x74,
	0x6f, 0x69, 0x6e, 0x63, 0x72, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x62,
	0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x18, 0x07, 0x20, 0x01, 0x28, 0x08, 0x52,
	0x0b, 0x64, 0x62, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x61, 0x74, 0x65, 0x64, 0x12, 0x12, 0x0a, 0x04,
	0x63, 0x75, 0x69, 0x64, 0x18, 0x08, 0x20, 0x01, 0x28, 0x08, 0x52, 0x04, 0x63, 0x75, 0x69, 0x64,
	0x12, 0x12, 0x0a, 0x04, 0x75, 0x75, 0x69, 0x64, 0x18, 0x09, 0x20, 0x01, 0x28, 0x08, 0x52, 0x04,
	0x75, 0x75, 0x69, 0x64, 0x12, 0x10, 0x0a, 0x03, 0x6e, 0x6f, 0x77, 0x18, 0x0a, 0x20, 0x01, 0x28,
	0x08, 0x52, 0x03, 0x6e, 0x6f, 0x77, 0x22, 0x60, 0x0a, 0x12, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62,
	0x75, 0x74, 0x65, 0x73, 0x52, 0x65, 0x6c, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x12, 0x0a, 0x04,
	0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x12, 0x16, 0x0a, 0x06, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x09,
	0x52, 0x06, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x73, 0x12, 0x1e, 0x0a, 0x0a, 0x72, 0x65, 0x66, 0x65,
	0x72, 0x65, 0x6e, 0x63, 0x65, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x09, 0x52, 0x0a, 0x72, 0x65,
	0x66, 0x65, 0x72, 0x65, 0x6e, 0x63, 0x65, 0x73, 0x42, 0x7c, 0x0a, 0x0c, 0x63, 0x6f, 0x6d, 0x2e,
	0x74, 0x61, 0x79, 0x67, 0x6f, 0x2e, 0x64, 0x62, 0x42, 0x0f, 0x41, 0x74, 0x74, 0x72, 0x69, 0x62,
	0x75, 0x74, 0x65, 0x73, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x1a, 0x74, 0x61, 0x79,
	0x67, 0x6f, 0x2e, 0x63, 0x6f, 0x6e, 0x74, 0x61, 0x63, 0x74, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x74,
	0x61, 0x79, 0x67, 0x6f, 0x2f, 0x64, 0x62, 0xa2, 0x02, 0x03, 0x54, 0x44, 0x58, 0xaa, 0x02, 0x08,
	0x54, 0x61, 0x79, 0x67, 0x6f, 0x2e, 0x44, 0x62, 0xca, 0x02, 0x08, 0x54, 0x61, 0x79, 0x67, 0x6f,
	0x5c, 0x44, 0x62, 0xe2, 0x02, 0x14, 0x54, 0x61, 0x79, 0x67, 0x6f, 0x5c, 0x44, 0x62, 0x5c, 0x47,
	0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x09, 0x54, 0x61, 0x79,
	0x67, 0x6f, 0x3a, 0x3a, 0x44, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_taygo_db_attributes_proto_rawDescOnce sync.Once
	file_taygo_db_attributes_proto_rawDescData = file_taygo_db_attributes_proto_rawDesc
)

func file_taygo_db_attributes_proto_rawDescGZIP() []byte {
	file_taygo_db_attributes_proto_rawDescOnce.Do(func() {
		file_taygo_db_attributes_proto_rawDescData = protoimpl.X.CompressGZIP(file_taygo_db_attributes_proto_rawDescData)
	})
	return file_taygo_db_attributes_proto_rawDescData
}

var file_taygo_db_attributes_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_taygo_db_attributes_proto_goTypes = []interface{}{
	(*Attributes)(nil),         // 0: taygo.db.Attributes
	(*AttributesDefault)(nil),  // 1: taygo.db.AttributesDefault
	(*AttributesRelation)(nil), // 2: taygo.db.AttributesRelation
	(*anypb.Any)(nil),          // 3: google.protobuf.Any
}
var file_taygo_db_attributes_proto_depIdxs = []int32{
	1, // 0: taygo.db.Attributes.default:type_name -> taygo.db.AttributesDefault
	2, // 1: taygo.db.Attributes.relation:type_name -> taygo.db.AttributesRelation
	3, // 2: taygo.db.AttributesDefault.value:type_name -> google.protobuf.Any
	3, // [3:3] is the sub-list for method output_type
	3, // [3:3] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_taygo_db_attributes_proto_init() }
func file_taygo_db_attributes_proto_init() {
	if File_taygo_db_attributes_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_taygo_db_attributes_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Attributes); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_taygo_db_attributes_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AttributesDefault); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_taygo_db_attributes_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AttributesRelation); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_taygo_db_attributes_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_taygo_db_attributes_proto_goTypes,
		DependencyIndexes: file_taygo_db_attributes_proto_depIdxs,
		MessageInfos:      file_taygo_db_attributes_proto_msgTypes,
	}.Build()
	File_taygo_db_attributes_proto = out.File
	file_taygo_db_attributes_proto_rawDesc = nil
	file_taygo_db_attributes_proto_goTypes = nil
	file_taygo_db_attributes_proto_depIdxs = nil
}